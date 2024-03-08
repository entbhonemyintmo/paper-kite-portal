import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router/Router";
import { CustomSnackbar } from "./hocs/CustomeSnackbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomSnackbar>
          <Router />
        </CustomSnackbar>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
