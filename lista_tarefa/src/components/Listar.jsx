import { useState } from 'react'
import './Listar.css'

export default function Listar() {
  const [tarefa, setTarefa] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lista, setLista] = useState([])

  // Para saber qual tarefa está em sendo editada
  const [Ideditando, setIdEditando] = useState(null)
  const [novoTexto, setNovoTexto] = useState('')
  const [novaCategoria, setNovaCategoria] = useState('')

  // Função pra adicionar uma nova tarefa
  function adicionarTarefa(e) {
    e.preventDefault()
    // Checar se o usuário deixou tarefa ou categoria vazios
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

    // Atualiza o estado da lista sem mudar o que já tinha antes, só adicionando a nova tarefa
    setLista([...lista, nova])
    setTarefa('')
    setCategoria('')
  }

  // Função pra atualizar o status da tarefa
  function atualizarStatus(id, novoStatus) {
    // Cria uma nova lista, mas só atualiza o item que bate com o id
    const novas = lista.map(tarefa =>
      tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
    )
    setLista(novas)
  }

  // Função pra excluir uma tarefa
  function excluirTarefa(id) {
    // Filtra e cria uma nova lista sem a tarefa que tem esse id
    const novaLista = lista.filter(tarefa => tarefa.id !== id)
    setLista(novaLista)
  }

  // Função para mover a tarefa de lugar
  function mover(id, direcao, categoriaAtual) {
    // Para pegar só as que pertencem à categoria atual
    const tarefasDaCategoria = lista.filter(tarefa => tarefa.categoria === categoriaAtual)
    // Para descobrir a posição da tarefa na categoria
    const index = tarefasDaCategoria.findIndex(tarefa => tarefa.id === id)
    const novaPosicao = index + direcao // nova posição que quero trocar

    // Se a posição estiver fora dos limites (começo ou fim da lista) não faz nada
    if (index === -1 || novaPosicao < 0 || novaPosicao >= tarefasDaCategoria.length) return

    // Id das tarefas que vão trocar de posição
    const id1 = tarefasDaCategoria[index].id
    const id2 = tarefasDaCategoria[novaPosicao].id

    // Cria uma cópia da lista inicial para mudar a posição dos itens
    const novaLista = [...lista]
    // Encontra os índices na lista geral para mudar a posição
    const idx1 = novaLista.findIndex(tarefa => tarefa.id === id1)
    const idx2 = novaLista.findIndex(tarefa => tarefa.id === id2)

    // Troco as posições na lista copia
    const temp = novaLista[idx1]
    novaLista[idx1] = novaLista[idx2]
    novaLista[idx2] = temp

    // Atualiza o estado da lista modificada
    setLista(novaLista)
  }

  // Função pra resetar a lista limpando tudo
  function resetar() {
    setLista([])
  }

  // Quando o usuário clica pra editar uma tarefa, essa função seta os estados de edição
  function iniciarEdicao(tarefa) {
    setIdEditando(tarefa.id) // Marca qual tarefa vai ser editada
    setNovoTexto(tarefa.texto) // Preenche o texto que vai ser editado
    setNovaCategoria(tarefa.categoria) // Preenche a categoria que vai ser editada
  }

  // Quando o usuário salvar a edição a tarefa é editada na lista
  function salvarEdicao(id) {
    const novaLista = lista.map(tarefa =>
      tarefa.id === id ? { ...tarefa, texto: novoTexto, categoria: novaCategoria } : tarefa
    )
    setLista(novaLista)
    // Limpa os estados de edição e sai do local de editar
    setIdEditando(null)
    setNovoTexto('')
    setNovaCategoria('')
  }

  //  Mostra os blocos das categorias que existem na lista
  const categoriasParaMostrar = [...new Set(lista.map(tarefa => tarefa.categoria))]

  return (
    <div className="lista-container">
      <div className="topo">
        <h2>Lista de Tarefas</h2>

        {/* Formulário pra adicionar as tarefas */}
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

      {/* Botão com a função de resetar que limpa tudo */}
      <button onClick={resetar}>Limpar Tudo</button>

      {/* Aqui mostra as categorias, cada uma com suas respectivas tarefas */}
      <div className="categorias-container">
        {categoriasParaMostrar.map(cat => (
          <div key={cat} className="categoria-bloco">
            <h3 style={{ fontWeight: 'bold' }}>{cat}</h3>
            <ul>
              {/* Lista só as tarefas da categoria atual */}
              {lista.filter(tarefa => tarefa.categoria === cat).map((item, i) => (
                  <li key={item.id} className={`tarefa ${item.status === 'Concluída' ? 'concluida' : item.status === 'Não realizada' ? 'nao-realizada' : 'pendente'}`}>
                    {Ideditando === item.id ? (
                      <>
                        {/* Se estiver editando, mostra os inputs para editar texto e categoria */}
                        <input type="text" value={novoTexto} onChange={e => setNovoTexto(e.target.value)}/>
                        <input type="text" value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)}/>
                        <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                      </>
                    ) : (
                      <>
                        {/* Senão, mostra a tarefa normal */}
                        <span>
                          {item.texto} — {item.status}
                        </span>
                        <div className="bts-tarefa">
                          {/* Botões para mudar status */}
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