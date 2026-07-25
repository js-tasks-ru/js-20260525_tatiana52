import { createElement } from "../../shared/utils/create-element";

interface Options {
  data?: number[];
  label?: string;
  value?: number;
  link?: string;
  formatHeading?: (value: number) => string;
}

export default class ColumnChart {
  element?: HTMLElement;
  chartHeight = 50;

  data: number[];
  label: string;
  value: number;
  link: string;
  formatHeading: (value: number) => string;

  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    formatHeading = (value) => String(value),
  }: Options = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
  }

  render() {
    this.element = createElement(`
      <div class="column-chart ${this.data.length ? "" : "column-chart_loading"}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `);
  }

  getLink() {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>`
      : "";
  }

  getColumnBody(data: number[]) {
    if (!data.length) {
      return "";
    }

    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data
      .map((item) => {
        const value = Math.floor(item * scale);
        const percent = `${((item / maxValue) * 100).toFixed(0)}%`;

        return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
      })
      .join("");
  }

  update(data: number[]) {
    this.data = data;

    const body = this.element?.querySelector('[data-element="body"]');

    if (!body || !this.element) {
      return;
    }

    body.innerHTML = this.getColumnBody(data);
    this.element.classList.toggle("column-chart_loading", !data.length);
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.element = undefined;
  }
}
