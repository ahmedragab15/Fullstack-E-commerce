import DashboardProductsTableSkeleton from "@/components/ProductsTableSkeleton";
import { axiosInstance } from "@/config/fetchApi";
import type { IProduct } from "@/interface";
import {  Table } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const getProductList = async () => {
  try {
    const { data, status } = await axiosInstance.get("/products?populate=thumbnail&populate=category");
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const DashboardProductsTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  if (isLoading) return <DashboardProductsTableSkeleton />;
  if (error) return <h3>{error?.message}</h3>;

  return (
    <Table.Root size="lg" striped showColumnBorder variant={"outline"} bg={"gray.800"}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader >Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.data.map((item: IProduct) => (
          <Table.Row key={item.documentId}>
            <Table.Cell w={"7/12"}>{item.title}</Table.Cell>
            <Table.Cell w={"3/12"}>{item?.category?.title}</Table.Cell>
            <Table.Cell w={"2/12"} >
              {item.price}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DashboardProductsTable;
