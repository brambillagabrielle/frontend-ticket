import { useState, useEffect } from "react";
import ComentarioContext from "./ComentarioContext";
import { getTicketsAPI }
    from "../../../servicos/TicketServico";
import {
    getComentariosAPI, getComentarioPorIdAPI,
    deleteComentarioPorIdAPI, postComentarioAPI
} from "../../../servicos/ComentarioServico"
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';
import { getUsuario } from "../../../seguranca/Autenticacao";

function Comentario() {
    let navigate = useNavigate();
    const usuario = getUsuario();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaTickets, setListaTickets] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "",
        data_postagem: "",
        texto: "",
        usuario: "",
        editado: "",
        ticket: ""
    });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "",
            data_postagem: "",
            texto: "",
            usuario: usuario.email,
            editado: "",
            ticket: ""
        });
    }

    const editarObjeto = async id => {
        try {
            setObjeto(await getComentarioPorIdAPI(id));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await postComentarioAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaComentarios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaComentarios = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getComentariosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaTickets = async () => {
        try {
            setListaTickets(await getTicketsAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteComentarioPorIdAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaComentarios();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTickets();
        recuperaComentarios();
    }, []);

    return (
        <ComentarioContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaTickets
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </ComentarioContext.Provider>
    )
}

export default WithAuth(Comentario);
