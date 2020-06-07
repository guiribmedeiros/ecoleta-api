import Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("items").del()
        .then(() => {
            // Inserts seed entries
            return knex("items").insert([
                { title: 'Lâmpadas', image: 'lampadas.svg' },
                { title: 'Pilhas e Baterias', image: 'baterias.svg' },
                { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
                { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
                { title: 'Resíduos Orgânicos', image: 'oleo.svg' },
                { title: 'Óleo de Cozinha', image: 'organicos.svg' },
            ]);
        });
};
