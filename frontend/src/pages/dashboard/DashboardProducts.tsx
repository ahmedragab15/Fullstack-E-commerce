import { useDeleteDashboardProductMutation, useGetDashboardProductsQuery, useUpdateDashboardProductMutation } from "@/app/services/productsApiSlice";
import ErrorMessage from "@/components/ErrorMessage";
import DashboardProductsTableSkeleton from "@/components/ProductsTableSkeleton";
import type { IProduct } from "@/interface";
import { Button, ButtonGroup, Field, FileUpload, Flex, IconButton, Image, Input, NumberInput, Pagination, Stack, Table } from "@chakra-ui/react";
// import { ActionBar, Checkbox, Portal, Kbd } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { LuFileImage } from "react-icons/lu";
import AlertDialog from "@/shared/AlertDialog";
import Modal from "@/shared/Modal";
import { productInputs } from "@/constants";
import { useEffect, useState, type SetStateAction } from "react";
import { useSelector } from "react-redux";
import { selectNetwork } from "@/app/features/networkSlice";

const DashboardProductsTable = () => {
  // const [selection, setSelection] = useState<string[]>([]);
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const [destoryProduct, { isLoading: isDeleting, isSuccess }] = useDeleteDashboardProductMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdated }] = useUpdateDashboardProductMutation();
    const { isOnline } = useSelector(selectNetwork);
  // const hasSelection = selection.length > 0;
  // const indeterminate = hasSelection && selection.length < data?.data.length;
console.log(isOnline);

  //* Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<null | IProduct>(null);

  const openEditModal = (product: SetStateAction<IProduct | null>) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setThumbnail(files[0]);
    console.log(thumbnail);
  };

  const handleUpdateProduct = () => {
    if (!productToEdit) return;

    const updatedData = {
      data: {
        title: productToEdit.title,
        description: productToEdit.description,
        price: Number(productToEdit.price),
        stock: Number(productToEdit.stock),
      },
    };

    updateProduct({
      documentId: productToEdit.documentId,
      body: updatedData,
    });
  };

  useEffect(() => {
    if (isUpdated) {
      setIsEditModalOpen(false);
      setProductToEdit(null);
      setThumbnail(null);
    }
  }, [isUpdated]);

  //* Remove Modal
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState("");
  const openConfirmModal = (documentId: SetStateAction<string>) => {
    setProductIdToRemove(documentId);
    setIsRemoveModalOpen(true);
  };

  const handleConfirm = () => {
    destoryProduct(productIdToRemove);
    setIsRemoveModalOpen(false);
    setProductIdToRemove("");
  };

  const getInputValue = (product: IProduct | null, name: string) => {
    if (!product) return "";
    switch (name) {
      case "category":
        return product.category?.title ?? "";
      case "thumbnail":
        return product.thumbnail?.formats?.thumbnail?.url ?? "";
      default: {
        const val = product[name as keyof IProduct];
        return typeof val === "string" || typeof val === "number" ? val : "";
      }
    }
  };

  const renderInput = productInputs.map((input) => (
    <Field.Root key={input.name}>
      <Field.Label>{input.label}</Field.Label>
      {input.type === "number" ? (
        <NumberInput.Root w={"full"} defaultValue={String(getInputValue(productToEdit, input.name) || 0)} onValueChange={(e) => setProductToEdit((prev) => (prev ? { ...prev, [input.name]: Number(e.value) } : null))}>
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      ) : input.type === "file" ? (
        <FileUpload.Root accept={["image/*"]}>
          <FileUpload.HiddenInput onChange={onChangeThumbnail} />
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm">
              <LuFileImage /> Upload Images
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List showSize clearable />
          {productToEdit?.thumbnail && <Image src={`${import.meta.env.VITE_IMG_URL}${productToEdit.thumbnail.formats?.thumbnail?.url}`} alt="Current thumbnail" boxSize="100px" rounded="md" objectFit="cover" mt={2} />}
        </FileUpload.Root>
      ) : input.name === "category" ? (
        <Input
          placeholder={input.placeholder}
          type={input.type}
          name={input.name}
          value={getInputValue(productToEdit, input.name)}
          readOnly // جعل الـ category للقراءة فقط لأننا نحتاج select أو dropdown
          // يمكنك استبدال هذا بـ select dropdown إذا كان لديك قائمة بالـ categories
        />
      ) : (
        <Input
          placeholder={input.placeholder}
          type={input.type}
          name={input.name}
          value={getInputValue(productToEdit, input.name)}
          onChange={(e) => {
            setProductToEdit((prev) => (prev ? { ...prev, [input.name]: e.target.value } : null));
          }}
        />
      )}
    </Field.Root>
  ));

  if (isLoading || !isOnline) return <DashboardProductsTableSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Stack width="full" gap="5">
        <Table.ScrollArea maxW={"full"}>
          <Table.Root size="lg" striped showColumnBorder stickyHeader variant={"outline"} bg={"gray.700"}>
            <Table.Caption mt={5}>Total Entries: {data?.data?.length ?? 0}</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign={"center"}>
                  {/* <Checkbox.Root
                    size="sm"
                    top="0.5"
                    aria-label="Select all rows"
                    checked={indeterminate ? "indeterminate" : selection.length > 0}
                    onCheckedChange={(changes) => {
                      setSelection(changes.checked ? data?.data.map((item: { title: string; }) => item.title) : []);
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root> */}
                  ID - DocumentID
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Title</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Thumbnail</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Price</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Stock</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.data.map((product: IProduct) => (
                <Table.Row key={product.documentId}>
                  {/* data-selected={selection.includes(item.title) ? "" : undefined} */}
                  <Table.Cell textAlign={"center"}>
                    {/* <Checkbox.Root
                      size="sm"
                      top="0.5"
                      mr={3}
                      aria-label="Select row"
                      checked={selection.includes(item.title)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) => (changes.checked ? [...prev, item.title] : selection.filter((title) => title !== item.title)));
                      }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root> */}
                    {product.id} - {product.documentId}
                  </Table.Cell>
                  <Table.Cell textAlign={"center"}>{product.title}</Table.Cell>
                  <Table.Cell textAlign={"center"}> {product?.category?.title}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <Image src={`${import.meta.env.VITE_IMG_URL}${product.thumbnail.formats.thumbnail.url}`} alt={product.title} boxSize="50px" rounded="md" objectFit="cover" mx={"auto"} />
                  </Table.Cell>
                  <Table.Cell textAlign={"center"}>{product.price}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{product.stock}</Table.Cell>
                  <Table.Cell>
                    <Flex alignItems={"center"} gap={2} justifyContent={"center"} flexWrap={"wrap"}>
                      <Button asChild variant={"solid"} bg={"purple.500"} color={"#e6f3fd"} size={"xl"} border={"none"} py={4} px={2} overflow={"hidden"} w={"fit-content"} _hover={{ bg: "#e6f3fd", color: "purple.500", border: "transparent" }}>
                        <Link to={`/product/${product.slug}`} title="View Product">
                          <IoMdEye />
                        </Link>
                      </Button>
                      <Button variant="solid" bg="red.500" color="#e6f3fd" size="xl" border="none" py={3} px={2} overflow="hidden" w="fit-content" _hover={{ bg: "#e6f3fd", color: "red.500", border: "transparent" }} onClick={() => openConfirmModal(product.documentId)}>
                        <MdDelete title="Remove Product" />
                      </Button>

                      <Button variant={"solid"} bg={"blue.500"} color={"#e6f3fd"} size={"xl"} border={"none"} py={4} px={2} overflow={"hidden"} w={"fit-content"} _hover={{ bg: "#e6f3fd", color: "blue.500", border: "transparent" }} onClick={() => openEditModal(product)}>
                        <FaPen title="Edit Product" />
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        {/* <ActionBar.Root open={hasSelection}>
          <Portal>
            <ActionBar.Positioner>
              <ActionBar.Content>
                <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <Button variant="outline" size="sm">
                  Delete <Kbd>⌫</Kbd>
                </Button>
                <Button variant="outline" size="sm">
                  Share <Kbd>T</Kbd>
                </Button>
              </ActionBar.Content>
            </ActionBar.Positioner>
          </Portal>
        </ActionBar.Root> */}

        <Pagination.Root count={data?.data.length * 5} pageSize={5} page={1}>
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items render={(page) => <IconButton variant={{ base: "ghost", _selected: "outline" }}>{page.value}</IconButton>} />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
      {/* AlertDialog */}
      <AlertDialog isOpen={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen} title="Delete Product" description={`Are you sure you want to delete the product? This action cannot be undone.`} confirmText="Destroy" isLoading={isDeleting} loadingText="Destroying..." isSuccess={isSuccess} cancelText="Cancel" onConfirm={handleConfirm} />
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} title="Edit Product" confirmLabel="Update" onConfirm={handleUpdateProduct} isLoading={isUpdating} loadingText="Updating...">
        {renderInput}
      </Modal>
    </>
  );
};

export default DashboardProductsTable;
