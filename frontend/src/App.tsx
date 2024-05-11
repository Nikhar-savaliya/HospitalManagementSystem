import { Button } from "./components/ui/button";
import { toast } from "./components/ui/use-toast";

const App = () => {
  return (
    <Button
      onClick={() => {
        return toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      App
    </Button>
  );
};

export default App;
