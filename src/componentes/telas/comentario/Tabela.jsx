import { useContext } from "react";
import ProdutoContext from "./ComentarioContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = 
    useContext(ProdutoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Comentários</h1>
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
                                <th scope="col">Data Postagem</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Texto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.id}>
                                        <td align="center">
                                            <button className="btn btn-info"
                                                title="Editar"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalEdicao"
                                                onClick={() => editarObjeto(objeto.id)} >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger"
                                                title="Remover"
                                                onClick={() =>
                                                    remover(objeto.codigo)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.id}</th>
                                        <td>{new Date(objeto.data_postagem).toLocaleDateString(undefined, {
                                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                            })}</td>
                                        <td>{objeto.usuario}</td>
                                        <td>{objeto.texto}</td>
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
