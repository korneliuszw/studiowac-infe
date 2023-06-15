export type Categories = Record<string, CalculatorCategory>

export interface CalculatorCategory {
    label: string;
    required?: boolean;
    onlyExtended?: boolean;
    fields?: Categories;
    ask?: boolean;
    askLabel?: string;
    labelPrimary?: string;
    labelExtended?: string;
}

export const categories: Categories = {
    'maths': {
        label: 'Matematyka',
        required: true
    },
    'polish': {
        label: 'Język polski',
        required: true,
    },
    'english': {
        label: 'Język obcy',
        required: true
    },
    'physics': {
        label: 'Fizyka',
        onlyExtended: true
    },
    'computerScience': {
        label: 'Informatyka',
        onlyExtended: true
    },
    'exam': {
        label: '',
        ask: true,
        askLabel: 'Czy masz tytul technika informatyka (lub bliski)?',
        fields: {
            'inf02': {
                label: 'Egzamin INF-02',
                labelPrimary: 'Teoria',
                labelExtended: 'Praktyka'
            },
            'inf03': {
                label: 'Egzamin INF-03',
                labelPrimary: 'Teoria',
                labelExtended: 'Praktyka'
            },
        }
    }
}