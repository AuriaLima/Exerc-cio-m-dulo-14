Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
})

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { authorization: token },
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('cadastrarUsuario', (token, "Auria", email, senha, "true") => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { authorization: token },
        body: {
            "nome": "Auria",
            "email": email,
            "password": senha,
            "administrador": "true"
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('editarUsuario', (token, usuario, email, senha, adm) => {
    return cy.request({
        method: 'PUT',
        url: `usuarios`,
        headers: { authorization: token },
        body: {
            "nome": usuario,
            "email": email,
            "password": senha,
            "administrador": adm
        }
    }).then(response => {
        return response;
    });
});