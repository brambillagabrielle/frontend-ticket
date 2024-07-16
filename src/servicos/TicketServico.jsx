import { getToken } from "../seguranca/Autenticacao";

export const getTicketsAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ticket`,
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

export const getTicketPorIdAPI = async id => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/ticket/${id}`,
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

export const deleteTicketPorIdAPI = async id => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/ticket/${id}`,
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

export const postTicketAPI = async (metodo, objeto) => {
    console.log(JSON.stringify(objeto));
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/ticket`,
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