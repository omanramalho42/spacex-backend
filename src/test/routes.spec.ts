import { expect, describe, it, beforeAll, afterAll } from 'vitest';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import mockRocket from './mock/rocket.mock';
import launcherApiMock from './mock/launcherApiMock';

describe('Testes da Rota da API', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterAll(() => {
    mock.restore();
  });

  it('Teste de chamada para rota de usuários', async () => {
    const userData = { id: 1, name: 'John Doe' };
    mock.onGet('/api/v1/users').reply(200, userData);

    const response = await axios.get('/api/v1/users');
    expect(response.data).toEqual(userData);
  });

  it('Teste de chamada para rota de lançamentos', async () => {
    mock.onGet('/api/v1/launchers').reply(200, launcherApiMock);

    const response = await axios.get('/api/v1/launchers');
    expect(response.data).toEqual(launcherApiMock);
  });

  it('Teste de chamada para rota de foguetes', async () => {
    mock.onGet('/api/v1/rockets').reply(200, mockRocket);

    const response = await axios.get('/api/v1/rockets');
    expect(response.data).toEqual(mockRocket);
  });
});
