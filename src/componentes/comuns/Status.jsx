function Status(props) {
    let classe = '', mensagem = '';
    if (props.status === "A") {
        mensagem = "Aberto";
        classe = "badge bg-secondary";
    } else if (props.status === "E") {
        mensagem = "Em andamento";
        classe = "badge bg-primary";
    } else if (props.status === "R") {
        mensagem = "Resolvido";
        classe = "badge bg-success";
    }

    return (
        <>
            {
                <div className={classe}>
                    {mensagem}
                </div>
            }
        </>
    )
}

export default Status;