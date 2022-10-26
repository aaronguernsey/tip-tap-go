import * as React from "react";

export interface IListItemProps {
  content: string;
}

export const ListItem = ({ content }: IListItemProps) => {
  return <li>{content}</li>;
};
