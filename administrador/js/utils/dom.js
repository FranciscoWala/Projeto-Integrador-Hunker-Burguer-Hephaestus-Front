export function criarEl(tag, className = '', textContent = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

export function criarHeaderBotao(imgSrc, nome) {
  const containerHeaderOpcao = document.createElement('div');
  containerHeaderOpcao.className = 'containerHeaderOpcao';

  const headerOpcao = document.createElement('div');
  headerOpcao.className = 'headerOpcao container';

  const img = document.createElement('img');
  img.src = imgSrc;

  const p = document.createElement('p');
  p.textContent = nome;

  headerOpcao.appendChild(img);
  containerHeaderOpcao.append(headerOpcao, p);

  return containerHeaderOpcao;
}