const isValidInput = (input: any): boolean => {
    const trimmedInput = input.trim(); // Remover espaços no início e no fim

    if (typeof trimmedInput !== 'string') return false; // Entrada não é uma string
    if (trimmedInput === '') return false; // Entrada vazia

    // Padrões perigosos de SQL Injection
    const dangerousPatterns = [
        /--/g,        // Comentários SQL
        /;/g,         // Terminações de SQL
        /'/g,         // Aspas simples
        /"/g,         // Aspas duplas
        /\\/g,        // Barra invertida
        /\/\*/g,      // Início de comentário em bloco
        /\*\//g,      // Fim de comentário em bloco
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION|FROM|WHERE)\b/gi // Palavras-chave SQL
    ];

    // Verificar se a entrada contém padrões perigosos
    for (let pattern of dangerousPatterns) {
        if (pattern.test(trimmedInput)) {
            return false; // Se encontrar um padrão perigoso, retorna falso
        }
    }

    return true; // Se a entrada for segura, retorna verdadeiro
}

const ValidateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export default {
    ValidateEmail,
    isValidInput
}
