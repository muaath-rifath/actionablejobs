// components/ClientPagination.tsx
"use client"
import React, { useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface ClientPaginationProps {
    total:number;
     currentPage: number,
      pageSize: number;
}


const ClientPagination: React.FC<ClientPaginationProps> = ({  total, currentPage, pageSize }) => {
  const totalPages = Math.ceil(total / pageSize);
    const router = useRouter();
    const pathname = usePathname();
  const searchParams = useSearchParams();

      const handlePageChange = useCallback((pageNumber: number) => {
          const params = new URLSearchParams(searchParams);
          params.set('page', String(pageNumber));
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page if not included
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationItem key="start-ellipsis"><span>...</span></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    // Add last page if not included
    if (endPage < totalPages) {
        if (endPage < totalPages -1 ) {
            items.push(<PaginationItem key="end-ellipsis"><span>...</span></PaginationItem>);
        }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
          <PaginationItem>
              <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
              />
          </PaginationItem>
          {getPaginationItems()}
          <PaginationItem>
              <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                   aria-disabled={currentPage === totalPages}
              />
          </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ClientPagination;