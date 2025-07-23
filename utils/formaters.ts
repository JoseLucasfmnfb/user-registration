export function formatPhone(value: string | undefined) {
    if (!value) return ""
    const onlyNumbers = value.replace(/\D/g, "")

    if (onlyNumbers.length <= 10) {
        // Telefone fixo
        return onlyNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    } else {
        // Celular
        return onlyNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
    }
}