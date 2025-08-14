import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

function TableContacts({ contacts, selectPage, setSelectPage }) {
  const lenContacts = contacts && contacts.length;
  const pages = [1, 2, 3, 4, 5];
  const isFirstPage = selectPage === 1;
  const isLastPage = selectPage === pages.length;

  function handleNextPage() {
    setSelectPage((prev) => prev + 1);
  }

  function handlePreviousPage() {
    setSelectPage((prev) => prev - 1);
  }
  return (
    <>
      <Table>
        <TableCaption>
          {lenContacts === 0 ? "There is no data" : "A list data"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Nationality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts &&
            contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  <Link to={`contacts/${contact.id}`}>
                    <img src={contact.picture} />
                  </Link>
                </TableCell>
                <TableCell className="align-top">
                  <Link
                    to={`contacts/${contact.id}`}
                    className="font-bold text-blue-400 hover:text-blue-700"
                  >
                    {contact.fullname}
                  </Link>
                  <div>{contact.email}</div>
                  <div>{contact.phone}</div>
                </TableCell>
                <TableCell className="align-top">{contact.gender}</TableCell>
                <TableCell className="align-top text-center">
                  {contact.nationality}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled
              className={`${
                isFirstPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handlePreviousPage}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page} className="cursor-pointer">
              <PaginationLink
                isActive={page === selectPage}
                onClick={() => setSelectPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={`${
                isLastPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handleNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default TableContacts;
