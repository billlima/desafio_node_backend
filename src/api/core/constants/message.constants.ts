const msg: Map<string, string> = new Map([
    
    ['succ_save', 'Salvo com sucesso'],
    ['succ_delete', 'Excluído com sucesso'],
    
    ['err', 'Erro ao realizar a operação'],
    ['err_invalid_request', 'Requisição inválida'],
    ['err_required_fields', 'Excluído com sucesso'],
    ['err_wrong_user_pass', 'Usuário ou senha incorretos'],
    ['err_not_found', 'Registro não encontrado'],
    ['err_invalid', '{0} inválido(a)'],
    ['err_unique', '{0} já cadastrado'],
    ['err_not_found_generic', '{0} não encontrado'],

    ['err_file_max_size', 'Arquivo deve ser até {0}'],
    ['err_file_not_found', 'Arquivo não encontrado'],

]);

function get(code: string): string {
    return <string>msg.get(code);
}

export { get };
