import { useState } from 'react'
import './Listar.css'

export default function Listar() {
  const [tarefa, setTarefa] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lista, setLista] = useState([])

  // Corrigido: camelCase
  const [idEditando, setIdEditando] = useState(null)
  const [novoTexto, setNovoTexto] = useState('')
  const [novaCategoria, setNovaCategoria] = useState('')

  function adicionarTarefa(e) {
    e.preventDefault()
    if (tarefa.trim() === '' || categoria.trim() === '') {
      alert('Preencha todos os campos para adicionar uma tarefa.')
      return
    }

    const nova = {
      id: lista.length + 1,
      texto: tarefa,
      categoria: categoria,
      status: 'Pendente'
    }

    setLista([...lista, nova])
    setTarefa('')
    setCategoria('')
  }

  function atualizarStatus(id, novoStatus) {
    const novas = lista.map(tarefa =>
      tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
    )
    setLista(novas)
  }

  function excluirTarefa(id) {
    const novaLista = lista.filter(tarefa => tarefa.id !== id)
    setLista(novaLista)
  }

  function mover(id, direcao, categoriaAtual) {
    const tarefasDaCategoria = lista.filter(tarefa => tarefa.categoria === categoriaAtual)
    const index = tarefasDaCategoria.findIndex(tarefa => tarefa.id === id)
    const novaPosicao = index + direcao

    if (index === -1 || novaPosicao < 0 || novaPosicao >= tarefasDaCategoria.length) return

    const id1 = tarefasDaCategoria[index].id
    const id2 = tarefasDaCategoria[novaPosicao].id

    const novaLista = [...lista]
    // Corrigido aqui:
    const idx1 = novaLista.findIndex(tarefa => tarefa.id === id1)
    const idx2 = novaLista.findIndex(tarefa => tarefa.id === id2)

    const temp = novaLista[idx1]
    novaLista[idx1] = novaLista[idx2]
    novaLista[idx2] = temp

    setLista(novaLista)
  }

  function resetar() {
    setLista([])
  }

  function iniciarEdicao(tarefa) {
    setIdEditando(tarefa.id)
    setNovoTexto(tarefa.texto)
    setNovaCategoria(tarefa.categoria)
  }

  function salvarEdicao(id) {
    const novaLista = lista.map(tarefa =>
      tarefa.id === id ? { ...tarefa, texto: novoTexto, categoria: novaCategoria } : tarefa
    )
    setLista(novaLista)
    setIdEditando(null)
    setNovoTexto('')
    setNovaCategoria('')
  }

  const categoriasParaMostrar = [...new Set(lista.map(tarefa => tarefa.categoria))]

  return (
    <div className="lista-container">
      <div className="topo">
        <h2>Lista de Tarefas</h2>
        <form onSubmit={adicionarTarefa}>
          <div>
            <label>Tarefa:</label>
            <input type="text" value={tarefa} onChange={e => setTarefa(e.target.value)} placeholder="Digite a tarefa"/>
          </div>
          <div>
            <label>Categoria:</label>
            <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Ex: estudo, casa, trabalho"/>
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <button onClick={resetar}>Limpar Tudo</button>

      <div className="categorias-container">
        {categoriasParaMostrar.map(cat => (
          <div key={cat} className="categoria-bloco">
            <h3 style={{ fontWeight: 'bold' }}>{cat}</h3>
            <ul>
              {lista.filter(tarefa => tarefa.categoria === cat).map((item, i) => (
                <li
                  key={item.id}
                  // Corrigido aqui:
                  className={`tarefa ${
                    item.status === 'Concluída'
                      ? 'concluida'
                      : item.status === 'Não realizada'
                      ? 'nao-realizada'
                      : 'pendente'
                  }`}
                >
                  {idEditando === item.id ? (
                    <>
                      <input type="text" value={novoTexto} onChange={e => setNovoTexto(e.target.value)} />
                      <input type="text" value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)} />
                      <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                    </>
                  ) : (
                    <>
                      <span>
                        {item.texto} — {item.status}
                      </span>
                      <div className="bts-tarefa">
                        <button onClick={() => atualizarStatus(item.id, 'Concluída')}>✅</button>
                        <button onClick={() => atualizarStatus(item.id, 'Não realizada')}>❌</button>
                        <button onClick={() => atualizarStatus(item.id, 'Pendente')}>⏳</button>
                        <button onClick={() => excluirTarefa(item.id)}>🗑️</button>
                        <button onClick={() => iniciarEdicao(item)}>✏️</button>
                        <div className="mover">
                          <button onClick={() => mover(item.id, -1, cat)}>▲</button>
                          <button onClick={() => mover(item.id, +1, cat)}>▼</button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
