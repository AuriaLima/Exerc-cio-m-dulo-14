/// <reference types= "cypress"/>
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
  let token
  before(() => {
    cy.token('auria.limabs@gmail.com', 'teste').then(tkn => { token = tkn })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })

  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = 'Usuário EBA' + Math.floor(Math.random() * 1000000000)

    cy.cadastrarUsuario(token, usuario, email, senha, adm)
      .should((response) => {
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      });

  })


  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "auria.lima@gmail.com",
        "password": "teste"
      }, failOnStatusCode: false

    }).then((response) => {
      cy.log(response.body.authorization)
      expect(response.status).equal(401)
      expect(response.body.message).to.equal('E-mail e/ou senha inválidos')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario = `Usuário EBAC ${Math.floor(Math.random() * 100000000)}`
    cy.cadastrarUsuario(token, usuario, email, senha, adm)
      .then(response => {
        let id = response.body._id

        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          headers: { authorization: token },
          body:
          {
            "nome": usuario,
            "email": email,
            "password": senha,
            "administrador": adm
          }
        }).then(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
        })
      })
  });


  it('Deve deletar um usuário previamente cadastrado', () => {
    let usuario = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
    cy.cadastrarUsuario(token, usuario, email, senha, adm)
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: { authorization: token }
        }).then(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
        })
      })

  });

});
