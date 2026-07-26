type SortOrder = "asc" | "desc";
import { createElement } from "../../shared/utils/create-element";

type SortableTableData = Record<string, string | number>;

interface SortableTableHeader {
  id: string;
  title: string;
  sortable?: boolean;
  sortType?: "string" | "number";
  template?: (value: string | number) => string;
}

export default class SortableTable {
  element?: HTMLElement;
  headersConfig: SortableTableHeader[];
  data: SortableTableData[];

  constructor(
    headersConfig: SortableTableHeader[] = [],
    data: SortableTableData[] = [],
  ) {
    this.headersConfig = headersConfig;
    this.data = data;

    this.render();
  }

  get template() {
    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.getTableHeader()}
        </div>

        <div data-element="body" class="sortable-table__body">
          ${this.getTableBody(this.data)}
        </div>
      </div>
    `;
  }

  render() {
    this.element = createElement(this.template);
  }

  getTableHeader() {
    return this.headersConfig
      .map(({ id, title, sortable = false }) => {
        return `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
            <span>${title}</span>
          </div>
        `;
      })
      .join("");
  }

  getTableBody(data: SortableTableData[]) {
    return data
      .map((item) => {
        const cells = this.headersConfig
          .map(({ id, template }) => {
            const value = item[id];

            if (template) {
              return template(value);
            }

            return `<div class="sortable-table__cell">${value}</div>`;
          })
          .join("");

        return `<a href="/products/${item.id}" class="sortable-table__row">${cells}</a>`;
      })
      .join("");
  }

  sort(field: string, order: SortOrder = "asc") {
    const headerItem = this.headersConfig.find((item) => item.id === field);

    if (!headerItem?.sortable) {
      return;
    }

    const direction = order === "asc" ? 1 : -1;
    const sortedData = [...this.data].sort((a, b) => {
      const firstValue = a[field];
      const secondValue = b[field];

      if (headerItem.sortType === "number") {
        return direction * (Number(firstValue) - Number(secondValue));
      }

      return (
        direction *
        String(firstValue).localeCompare(String(secondValue), ["ru", "en"], {
          caseFirst: "upper",
        })
      );
    });

    this.data = sortedData;

    const body = this.element?.querySelector<HTMLElement>(
      '[data-element="body"]',
    );
    const headerCells = this.element?.querySelectorAll<HTMLElement>(
      ".sortable-table__cell[data-id]",
    );

    if (body) {
      body.innerHTML = this.getTableBody(sortedData);
    }

    if (headerCells) {
      headerCells.forEach((cell) => {
        if (cell.dataset.id === field) {
          cell.dataset.order = order;
        } else {
          delete cell.dataset.order;
        }
      });
    }
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = undefined;
  }
}
