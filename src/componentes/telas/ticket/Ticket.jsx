import { useState, useEffect } from "react";
import TicketContext from "./TicketContext";
import {
    getTicketsAPI, getTicketPorIdAPI,
    deleteTicketPorIdAPI, postTicketAPI
}
    from "../../../servicos/TicketServico";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';
import { getUsuario } from "../../../seguranca/Autenticacao";

function Ticket() {
    let navigate = useNavigate();
    const usuario = getUsuario();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState(
        { 
            id: "",
            resumo: "",
            descricao: "",
            responsavel: "",
            solicitante: "",
            data_abertura: ""
        }
    );
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto(
            { 
                id: 0,
                resumo: "",
                descricao: "",
                responsavel: "",
                solicitante: usuario.email,
                data_abertura: ""
            }
        );
    }

    const editarObjeto = async id => {
        try {
            setObjeto(await getTicketPorIdAPI(id));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoPostar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await postTicketAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaTickets();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaTickets = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getTicketsAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteTicketPorIdAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaTickets();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTickets();
    }, []);

    return (
        <TicketContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoPostar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </TicketContext.Provider>
    )
}

export default WithAuth(Ticket);