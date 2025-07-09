import { useState } from 'react'
import './Listar.css'

export default function Listar() {
  const [tarefa, setTarefa] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lista, setLista] = useState([])

  // p saber qual tarefa está em sendo editada
  const [Ideditando, setIdEditando] = useState(null)
  const [novoTexto, setNovoTexto] = useState('')
  const [novaCategoria, setNovaCategoria] = useState('')

  // função p adicionar uma nova tarefa
  function adicionarTarefa(e) {
    e.preventDefault()
    // checar se o usuário deixou tarefa ou categoria vazios
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

    // atualiza o estado da lista sem mudar o que já tinha antes, só adicionando a nova tarefa
    setLista([...lista, nova])
    // p limpar os inputs
    setTarefa('')
    setCategoria('')
  }

  // função p atualizar o status da tarefa
  function atualizarStatus(id, novoStatus) {
    // crio uma nova lista, mas só atualizo o item que bate com o id
    const novas = lista.map(tarefa =>
      tarefa.id === id ? { ...tarefa, status: novoStatus } : t
    )
    setLista(novas)
  }

  // função p excluir uma tarefa
  function excluirTarefa(id) {
    // filtra e cria uma nova lista sem a tarefa que tem esse id
    const novaLista = lista.filter(tarefa => tarefa.id !== id)
    setLista(novaLista)
  }

  // função p mover a tarefa de lugar
  function mover(id, direcao, categoriaAtual) {
    // p pegar só as que pertencem à categoria atual
    const tarefasDaCategoria = lista.filter(tarefa => tarefa.categoria === categoriaAtual)
    // p descobrir a posição da tarefa na categoria
    const index = tarefasDaCategoria.findIndex(tarefa => tarefa.id === id)
    const novaPosicao = index + direcao // nova posição que quero trocar

    // Se estiver fora dos limites (começo ou fim da lista), não faz nada
    if (index === -1 || novaPosicao < 0 || novaPosicao >= tarefasDaCategoria.length) return

    // Id das duas tarefas que vão trocar de posição
    const id1 = tarefasDaCategoria[index].id
    const id2 = tarefasDaCategoria[novaPosicao].id

    // Crio uma cópia da lista original para trocar a posição dos itens
    const novaLista = [...lista]
    // Encontro os índices na lista geral para trocar
    const idx1 = novaLista.findIndex(t => t.id === id1)
    const idx2 = novaLista.findIndex(t => t.id === id2)

    // Troco as posições na lista copia
    const temp = novaLista[idx1]
    novaLista[idx1] = novaLista[idx2]
    novaLista[idx2] = temp

    // Atualizo o estado com a lista já alterada
    setLista(novaLista)
  }

  // Função simples pra resetar a lista, limpa tudo
  function resetar() {
    setLista([])
  }

  // Quando o usuário clica pra editar uma tarefa, essa função seta os estados de edição
  function iniciarEdicao(tarefa) {
    setIdEditando(tarefa.id) // marco qual tarefa está editando
    setNovoTexto(tarefa.texto) // preencho o texto que vai ser editado
    setNovaCategoria(tarefa.categoria) // preencho a categoria que vai ser editada
  }

  // Quando o usuário salva a edição, atualizo a tarefa na lista
  function salvarEdicao(id) {
    const novaLista = lista.map(t =>
      t.id === id ? { ...t, texto: novoTexto, categoria: novaCategoria } : t
    )
    setLista(novaLista)
    // Limpo os estados de edição, saio do modo edição
    setIdEditando(null)
    setNovoTexto('')
    setNovaCategoria('')
  }

  //  mostra os blocos das categorias que existem na lista
  const categoriasParaMostrar = [...new Set(lista.map(t => t.categoria))]


  return (
    <div className="lista-container">
      <div className="topo">
        <h2>Lista de Tarefas</h2>

        {/* Form pra adicionar tarefa */}
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
      </div>

      {/* Botão que limpa tudo */}
      <button onClick={resetar}>Limpar Tudo</button>

      {/* Aqui mostro as categorias, cada uma com sua lista de tarefas */}
      <div className="categorias-container">
        {categoriasParaMostrar.map(cat => (
          <div key={cat} className="categoria-bloco">
            <h3 style={{ fontWeight: 'bold' }}>{cat}</h3>
            <ul>
              {/* Listo só as tarefas da categoria atual */}
              {lista
                .filter(t => t.categoria === cat)
                .map((item, i) => (
                  <li
                    key={item.id}
                    className={`tarefa ${
                      item.status === 'Concluída'
                        ? 'concluida'
                        : item.status === 'Não realizada'
                        ? 'nao-realizada'
                        : 'pendente'
                    }`}
                  >
                    {Ideditando === item.id ? (
                      <>
                        {/* Se estiver editando, mostro inputs para editar texto e categoria */}
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
                        <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                      </>
                    ) : (
                      <>
                        {/* Senão, mostro a tarefa normal */}
                        <span>
                          {item.texto} — {item.status}
                        </span>
                        <div className="bts-tarefa">
                          {/* Botões para mudar status */}
                          <button onClick={() => atualizarStatus(item.id, 'Concluída')}>
                            ✅
                          </button>
                          <button onClick={() => atualizarStatus(item.id, 'Não realizada')}>
                            ❌
                          </button>
                          <button onClick={() => atualizarStatus(item.id, 'Pendente')}>
                            ⏳
                          </button>
                          {/* Botão para excluir a tarefa */}
                          <button onClick={() => excluirTarefa(item.id)}>🗑️</button>
                          {/* Botão para iniciar a edição */}
                          <button onClick={() => iniciarEdicao(item)}>✏️</button>
                          {/* Botões para mover a tarefa para cima ou para baixo dentro da categoria */}
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
