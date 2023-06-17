export const processCalculationSearchParams = (searchParams: Record<string, any>) => {
    const {
        inf03_primary,
        inf03_extended,
        inf02_primary,
        inf02_extended,
        ...values
    } = searchParams
    // this is just stupid
    // but for zod validation, if exams are defined then we need all of them, if not, none of them
    // this would require some conditional validation, which is not supported by zod
    if (inf02_primary) return {
        ...values,
        exams: {
            inf02_primary,
            inf02_extended,
            inf03_primary,
            inf03_extended,
        }
    }
    return values
}