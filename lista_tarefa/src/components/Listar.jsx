import { useState } from 'react'
import './Listar.css'

export default function Listar() {
  const [tarefa, setTarefa] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lista, setLista] = useState([])
  const [editandoId, setEditandoId] = useState(null)
  const [novoTexto, setNovoTexto] = useState('')
  const [novaCategoria, setNovaCategoria] = useState('')

  function adicionarTarefa(e) {
    e.preventDefault()
    if (tarefa === '' || categoria === '') return
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

  function mover(index, direcao) {
    const nova = [...lista]
    const pos = index + direcao
    if (pos < 0 || pos >= lista.length) return
    const temp = nova[index]
    nova[index] = nova[pos]
    nova[pos] = temp
    setLista(nova)
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

  return (
    <div className="lista-container">
      <h2>Lista de Tarefas</h2>

      <form onSubmit={adicionarTarefa}>
        <div>
          <label>Tarefa:</label>
          <input
            type="text"
            value={tarefa}
            onChange={e => setTarefa(e.target.value)}
            placeholder="Digite a tarefa"
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            placeholder="Ex: estudo, casa, trabalho"
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>

      <button onClick={resetar}>Limpar Tudo</button>

      <ul>
        {lista.map((item, i) => (
          <li key={item.id}>
            {editandoId === item.id ? (
              <>
                <input
                  type="text"
                  value={novoTexto}
                  onChange={e => setNovoTexto(e.target.value)}
                />
                <input
                  type="text"
                  value={novaCategoria}
                  onChange={e => setNovaCategoria(e.target.value)}
                />
                <button onClick={() => salvarEdicao(item.id)}>💾 Salvar</button>
              </>
            ) : (
              <>
                <span>{item.texto} — {item.status} — {item.categoria}</span>
                <div>
                  <button onClick={() => atualizarStatus(item.id, 'Concluída')}>✅</button>
                  <button onClick={() => atualizarStatus(item.id, 'Não realizada')}>❌</button>
                  <button onClick={() => atualizarStatus(item.id, 'Pendente')}>⏳</button>
                  <button onClick={() => excluirTarefa(item.id)}>🗑️</button>
                  <button onClick={() => iniciarEdicao(item)}>✏️ Editar</button>
                  <button onClick={() => mover(i, -1)}>▲</button>
                  <button onClick={() => mover(i, +1)}>▼</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
