export const getRatingClass = (rating) => {
    switch (rating) {
      case 5:
        return " bg-green-500";
      case 4:
        return "bg-blue-500";
      case 3:
        return "bg-yellow-500";
      case 2:
        return "bg-orange-500";
      case 1:
        return "bg-red-500";
      default:
        return "";
    }
  };

  export const getRatingText = (rating) => {
    switch (rating) {
      case 5:
        return "Excellent";
      case 4:
        return "Best";
      case 3:
        return "Normal";
      case 2:
        return "Poor";
      case 1:
        return "Very Poor";
      default:
        return "";
    }
  };