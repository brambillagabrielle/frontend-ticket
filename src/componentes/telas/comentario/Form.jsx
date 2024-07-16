import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ComentarioContext from "./ComentarioContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaTickets }
        = useContext(ComentarioContext);
    console.log(objeto);

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
                            id="exampleModalLabel">{(objeto.id !== "" && "Comentário #" + objeto.id + ((objeto.editado === true && " [editado]") || "")) || "Novo Comentário"}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtId" className="form-label">ID</label>
                                <input type="number" className="form-control" id="txtId"
                                    readOnly name="id" value={objeto.id} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDataPostagem" className="form-label">Data de Postagem</label>
                                {(objeto.data_postagem !== "" &&
                                    <input type="text" className="form-control" id="txtDataPostagem"
                                        readOnly name="dataAbertura" value={
                                            new Date(objeto.data_postagem).toLocaleDateString(undefined, {
                                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                            })
                                        } onChange={handleChange} />)
                                    || <input type="text" className="form-control" id="txtDataPostagem"
                                        readOnly name="dataPostagem" value={objeto.data_postagem} onChange={handleChange} />
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtTexto" className="form-label">Texto</label>
                                <input type="text" className="form-control"
                                    id="txtTexto" placeholder="Informe o texto"
                                    required name="texto" value={objeto.texto}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Texto OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o texto!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtUsuario" className="form-label">Usuário</label>
                                <input type="text" className="form-control" id="txtUsuario"
                                    readOnly name="usuario" value={objeto.usuario} onChange={handleChange} />
                            </div>
                            {(objeto.id === "" &&
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="selectTicket"
                                            className="form-label">Ticket</label>
                                        <select type="text" className="form-control"
                                            id="selectTicket"
                                            required name="ticket" value={objeto.Ticket}
                                            onChange={handleChange} >
                                            <option disabled="true" value="">Selecione o ticket</option>
                                            {
                                                listaTickets.map((ticket) => (
                                                    <option key={ticket.id}
                                                        value={ticket.id}>
                                                        {ticket.id} - {ticket.resumo}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <div className="valid-feedback">
                                            Ticket OK!
                                        </div>
                                        <div className="invalid-feedback">
                                            Selecione a ticket
                                        </div>
                                    </div>
                                </>)
                                ||
                                <div className="mb-3">
                                    <label htmlFor="txtTicket" className="form-label">Ticket</label>
                                    <input type="text" className="form-control" id="txtTicket"
                                        readOnly name="ticket" value={objeto.ticket} onChange={handleChange} />
                                </div>
                            }
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Fechar</button>
                                <button type="submit"
                                    className="btn btn-success">
                                    Salvar
                                    <i className="bi bi-save"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;