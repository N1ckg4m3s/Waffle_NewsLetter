module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',  // ou 'jsdom' para testes em ambiente de navegador
    transform: {
      '^.+\\.ts$': 'ts-jest',  // Isso permite que o Jest entenda arquivos TypeScript
    },
    testRegex: '.*\\.test\\.ts$',  // Ou outro padrão para os seus arquivos de teste
  };
  