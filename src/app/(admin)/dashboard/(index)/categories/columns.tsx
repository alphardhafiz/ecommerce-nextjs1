"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="space-x-4">
          <Button size="sm">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      );
    },
  },
];
