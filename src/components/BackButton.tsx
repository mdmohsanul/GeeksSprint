import { FaArrowCircleLeft } from "react-icons/fa";


import { Button } from "./ui/button";

const BackButton = () => {
  return (
      <Button
            variant="outline"
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <FaArrowCircleLeft className="mr-2" /> Back
          </Button>
  )
}

export default BackButton