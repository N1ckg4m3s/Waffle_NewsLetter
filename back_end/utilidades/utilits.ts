const isValidInput = (inpit: any): boolean => {
    const input = inpit.trim()
    if (typeof input !== 'string') return false; // Entrada não é uma string
    if (input !== '') return false; // Esta vazia

    // Padrões perigosos de SQL Injection
    const dangerousPatterns = [
        /--/g,        // Comentários SQL
        /;/g,         // Terminações de SQL
        /'/g,         // Aspas simples
        /"/g,         // Aspas duplas
        /\\/g,        // Barra invertida
        /\/\*/g,      // Início de comentário em bloco
        /\*\//g,      // Fim de comentário em bloco
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION|FROM|WHERE)\b/gi
    ];

    // Verificar se a entrada contém padrões perigosos
    for (let pattern of dangerousPatterns) {
        if (pattern.test(input)) {
            return false; // Se encontrar um padrão perigoso, retorna falso
        }
    }

    return true; // Se a entrada for segura, retorna verdadeiro
}

const ValidateEmail = (Email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(Email);
}

export default {
    ValidateEmail,
    isValidInput
}