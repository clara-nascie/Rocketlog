import type {Config} from 'jest';

const config: Config = {
  //executa apenas um teste por vez
  bail: true,

  //limpa o mock antes de cada teste
  clearMocks: true,

  //provider de cobertura de testes
  coverageProvider: "v8",

  //configuração do jest
  preset: "ts-jest",

  //ambiente de teste
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],

  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  }

 
};

export default config;
