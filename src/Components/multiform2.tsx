import Add_Expense from "./Add_Expense";
import Add_Income from "./Add_Income";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Shadui/ui/tabs";

function MultiForm2({ income, expense }: any) {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">
          {expense ? "Expense Entries" : "Expense"}
        </TabsTrigger>
        <TabsTrigger value="password">
          {" "}
          {income ? "Income Entries" : "Income"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {expense ? expense : <Add_Expense />}
      </TabsContent>
      <TabsContent value="password">
        {income ? income : <Add_Income />}
      </TabsContent>
    </Tabs>
  );
}

export default MultiForm2;
