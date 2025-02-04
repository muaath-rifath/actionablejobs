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
    total: number;
    currentPage: number;
    pageSize: number;
}

const ClientPagination: React.FC<ClientPaginationProps> = ({ total, currentPage, pageSize }) => {
    const totalPages = Math.ceil(total / pageSize);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = useCallback((pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNumber));
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams, totalPages]);

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3; // Reduced to show fewer middle pages
        
        // Always show first page
        items.push(
            <PaginationItem key={1}>
                <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(1)}
                    isActive={1 === currentPage}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Calculate middle pages
        let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(2, endPage - maxVisiblePages + 1);
        }

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            items.push(
                <PaginationItem key="ellipsis1">
                    <PaginationLink href="#" className="cursor-default">
                        ...
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Add middle pages
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

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            items.push(
                <PaginationItem key="ellipsis2">
                    <PaginationLink href="#" className="cursor-default">
                        ...
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Always show last page if there is more than one page
        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                        isActive={totalPages === currentPage}
                    >
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
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {getPaginationItems()}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default ClientPagination;
