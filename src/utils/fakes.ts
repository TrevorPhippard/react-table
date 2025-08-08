import { faker } from "@faker-js/faker";
import type { RowData } from "../types";

export function createMockUser(id: number): RowData {
  return {
    ID: id,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    city: faker.location.city(),
    registered_date: faker.date.past({ years: 5 }).toISOString().split("T")[0], // e.g. "2022-03-14"
  };
}

export function createMockUsers(count: number): RowData[] {
  return Array.from({ length: count }, (_, i) => createMockUser(i + 1));
}
