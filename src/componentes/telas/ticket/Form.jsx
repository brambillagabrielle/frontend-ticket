import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TicketContext from "./TicketContext";
import Status from "../../comuns/Status";
import { getUsuario } from "../../../seguranca/Autenticacao";

function Form() {
    const { objeto, handleChange, acaoPostar, alerta }
        = useContext(TicketContext);
    const usuario = getUsuario();

    (() => {
        'use strict'

        const forms = document.querySelectorAll('.needs-validation')

        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id="modalEdicao"
            tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5"
                            id="exampleModalLabel">{(objeto.id === 0 && objeto.resumo) || "Novo Ticket"} {objeto.tipo !== "" && <Status status={objeto.status} />}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoPostar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtDataAbertura" className="form-label">Data de Abertura</label>
                                {(objeto.data_abertura !== "" &&
                                    <input type="text" className="form-control" id="txtDataAbertura"
                                        readOnly name="dataAbertura" value={
                                            new Date(objeto.data_abertura).toLocaleDateString(undefined, {
                                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                            })
                                        } onChange={handleChange} />)
                                    || <input type="text" className="form-control" id="txtDataAbertura"
                                        readOnly name="dataAbertura" value={objeto.data_abertura} onChange={handleChange} />
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtId" className="form-label">ID</label>
                                <input type="number" className="form-control" id="txtId"
                                    readOnly name="id" value={objeto.id} onChange={handleChange} />
                            </div>
                            {
                                (usuario.tipo !== 'S' && objeto.id === 0) && <div className="mb-3">
                                    <label htmlFor="selectStatus"
                                        className="form-label">Status <i className="bi bi-pencil"></i></label>
                                    <select type="text" className="form-control"
                                        id="selectStatus"
                                        required name="status" value={objeto.status}
                                        onChange={handleChange} >
                                        <option disabled="true" value="">Status</option>
                                        <option key='A' value='A'>Aberto</option>
                                        <option key='E' value='E'>Em andamento</option>
                                        <option key='R' value='R'>Resolvido</option>
                                    </select>
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="txtResumo" className="form-label">Resumo <i className="bi bi-pencil"></i></label>
                                <input type="text" className="form-control"
                                    id="txtResumo" placeholder="Informe o resumo"
                                    required name="resumo" value={objeto.resumo}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Resumo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o resumo!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDescricao" className="form-label">Descrição <i className="bi bi-pencil"></i></label>
                                <textarea type="text" className="form-control"
                                    id="txtDescricao" placeholder="Informe a descrição"
                                    required name="descricao" value={objeto.descricao}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Descrição OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o descrição!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtSolicitante" className="form-label">Solicitante</label>
                                <input type="text" className="form-control" id="txtSolicitante"
                                    readOnly name="solicitante" value={objeto.solicitante} onChange={handleChange} />
                            </div>
                            {
                                ((usuario.tipo !== 'S' && usuario.email !== objeto.responsavel) && <div className="mb-3">
                                    <label htmlFor="selectResponsavel"
                                        className="form-label">Atribuir a mim <i className="bi bi-pencil"></i></label>
                                    <select type="text" className="form-control"
                                        id="selectResponsavel"
                                        name="responsavel" value={objeto.responsavel}
                                        onChange={handleChange} >
                                        <option key="Atual" value={objeto.responsavel}>{objeto.responsavel}</option>
                                        <option key="Novo" value={usuario.email}>{usuario.email}</option>
                                    </select>
                                </div>)
                                || <div className="mb-3">
                                    <label htmlFor="txtResponsavel" className="form-label">Responsável</label>
                                    <input type="text" className="form-control" id="txtResponsavel"
                                        readOnly name="responsavel" value={objeto.responsavel} onChange={handleChange} />
                                </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Fechar</button>
                            <button type="submit"
                                className="btn btn-success">
                                Salvar
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;