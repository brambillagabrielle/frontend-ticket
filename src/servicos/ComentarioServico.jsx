import { getToken } from "../seguranca/Autenticacao";

export const getComentariosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/comentario`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getComentarioPorIdAPI = async id => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/comentario/${id}`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getComentariosPorTicketAPI = async id => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/comentario/ticket/${id}`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteComentarioPorIdAPI = async id => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/comentario/${id}`,
    {
        method : "DELETE",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const postComentarioAPI = async (metodo, objeto) => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/comentario`,
    {
        method : metodo,
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        },
        body : JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
}