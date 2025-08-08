# Table Component

The `Table` component is a highly customizable and performant data table built with React and [React Virtuoso](https://virtuoso.dev/) for efficient virtual scrolling of large datasets and [dnd-kit](https://dndkit.com/) for performant, accessible drag & drop

## Features

- **Virtualized Rendering:** Uses `react-virtuoso` to render only visible rows, enabling smooth performance with large datasets.
- **Sortable Columns:** Supports sorting by clicking column headers. Sort state toggles between ascending and descending.
- **Drag-and-Drop Column Reordering:** Users can reorder columns by dragging headers, powered by `@dnd-kit`.
- **Responsive Layout:** Automatically handles horizontal overflow and adapts to container width.

## Usage

Pass in an array of `columns` and `data` via props. The component manages sorting and column order internally.

```tsx
<Table columns={columns} data={data} />
```
