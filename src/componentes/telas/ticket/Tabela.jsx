import { useContext } from "react";
import TicketContext from "./TicketContext";
import Alerta from "../../comuns/Alerta";
import Status from "../../comuns/Status";
import { getUsuario } from '../../../seguranca/Autenticacao';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(TicketContext);
    const usuario = getUsuario();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Tickets</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">ID</th>
                                <th scope="col">Resumo</th>
                                <th scope="col">Data Abertura</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (usuario.tipo !== 'S' || 
                                    usuario.email === objeto.solicitante) && (
                                    <tr key={objeto.id}>
                                        <td align="center">
                                            <button className="btn btn-info"
                                                title="Expandir"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalEdicao"
                                                onClick={() => editarObjeto(objeto.id)} >
                                                <i className="bi bi-zoom-in"></i>
                                            </button>
                                            <button className="btn btn-danger"
                                                title="Remover"
                                                onClick={() =>
                                                    remover(objeto.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.id}</th>
                                        <td>{objeto.resumo}</td>
                                        <td>{new Date(objeto.data_abertura).toLocaleDateString(undefined, {
                                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                            })}</td>
                                        <td><Status status={objeto.status}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Tabela;
