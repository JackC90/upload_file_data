import React from "react";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedPage?: number;
  itemsPerPage?: number;
  total?: number;
  onChangePage?: Function;
}

export interface OnChangePageValue {
  page: number;
  offset: number;
  limit: number;
}
