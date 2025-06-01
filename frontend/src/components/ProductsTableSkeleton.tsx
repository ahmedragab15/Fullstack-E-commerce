import { Skeleton, Table } from "@chakra-ui/react";

const DashboardProductsTableSkeleton = () => {
  return (
    <Table.Root size="lg"  striped showColumnBorder variant="outline" >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Array.from({ length: 5 }).map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell w="7/12">
              <Skeleton height="20px" width="80%" />
            </Table.Cell>
            <Table.Cell w="3/12">
              <Skeleton height="20px" width="80%" />
            </Table.Cell>
            <Table.Cell w="2/12" >
              <Skeleton height="20px" width="80%"  />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default DashboardProductsTableSkeleton;