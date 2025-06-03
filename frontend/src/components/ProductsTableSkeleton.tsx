import { Skeleton, Table} from "@chakra-ui/react";

const DashboardProductsTableSkeleton = () => {
  return (
    <Table.Root size="lg" striped showColumnBorder variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center">ID</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Title</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Thumbnail</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Stock</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Array.from({ length: 5 }).map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell textAlign="center">
              <Skeleton height="16px" width="40px" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="16px" width="80%" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="16px" width="70%" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="50px" width="50px" borderRadius="md" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="16px" width="50%" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="16px" width="50%" mx="auto" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Skeleton height="36px" width="90px" mx="auto" borderRadius="md" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DashboardProductsTableSkeleton;
