import { useState } from 'react'
import './Listar.css'

export default function Listar() {
  const [tarefa, setTarefa] = useState('')
  const [categoria, setCategoria] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [lista, setLista] = useState([])

  const [editandoId, setEditandoId] = useState(null)
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
    const novas = lista.map(t =>
      t.id === id ? { ...t, status: novoStatus } : t
    )
    setLista(novas)
  }

  function excluirTarefa(id) {
    const novaLista = lista.filter(t => t.id !== id)
    setLista(novaLista)
  }

  function mover(id, direcao, categoriaAtual) {
    const tarefasDaCategoria = lista.filter(t => t.categoria === categoriaAtual)
    const index = tarefasDaCategoria.findIndex(t => t.id === id)
    const pos = index + direcao

    if (index === -1 || pos < 0 || pos >= tarefasDaCategoria.length) return

    const id1 = tarefasDaCategoria[index].id
    const id2 = tarefasDaCategoria[pos].id

    const novaLista = [...lista]
    const idx1 = novaLista.findIndex(t => t.id === id1)
    const idx2 = novaLista.findIndex(t => t.id === id2)

    const temp = novaLista[idx1]
    novaLista[idx1] = novaLista[idx2]
    novaLista[idx2] = temp

    setLista(novaLista)
  }

  function resetar() {
    setLista([])
  }

  function iniciarEdicao(tarefa) {
    setEditandoId(tarefa.id)
    setNovoTexto(tarefa.texto)
    setNovaCategoria(tarefa.categoria)
  }

  function salvarEdicao(id) {
    const novaLista = lista.map(t =>
      t.id === id ? { ...t, texto: novoTexto, categoria: novaCategoria } : t
    )
    setLista(novaLista)
    setEditandoId(null)
    setNovoTexto('')
    setNovaCategoria('')
  }

  const categoriasUnicas = [...new Set(lista.map(t => t.categoria))]
  const categoriasParaMostrar =
    filtroCategoria === 'Todas' ? categoriasUnicas : [filtroCategoria]

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
              {lista.filter(t => t.categoria === cat).map((item, i) => (
                  <li key={item.id} className={`tarefa ${ item.status === 'Concluída' ? 'concluida' : item.status === 'Não realizada' ? 'nao-realizada' : 'pendente'}`}>
                    {editandoId === item.id ? (
                      <>
                        <input type="text" value={novoTexto} onChange={e => setNovoTexto(e.target.value)}/>
                        <input type="text" value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)}/>
                        <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                      </>
                    ) : (
                      <>
                        <span>
                          {item.texto} — {item.status}
                        </span>
                        <div className='bts-tarefa'>
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
