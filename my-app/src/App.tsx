import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaProduto from './pages/ListaProdutos';
import CadastroAtualizarProduto from './pages/CadastraAtualizarProduto';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { Container } from './components/Container';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <NavBar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/produto/lista' element={<ListaProduto />} />
            <Route path='/produto/detalhar/:id' element={<CadastroAtualizarProduto />} />
            <Route path='/produto/cadastrar' element={<CadastroAtualizarProduto />} />
            <Route path='/produto/editar/:editarId' element={<CadastroAtualizarProduto />} />
            <Route index element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
