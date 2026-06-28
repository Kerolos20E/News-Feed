import { AppBar, Select, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: "auto",
  width: 200,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.common.white,
  margin: theme.spacing(2),
  width: 200,
  height: 40,
  "& .MuiSelect-icon": {
    color: theme.palette.text.primary,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function NewsHeader(props) {
  const { onSearchChange, onCategoryChange, category } = props;

  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NewsFeed App</Typography>
        <StyledSelect value={category} onChange={handleCategoryChange}>
          <StyledMenuItem value="">All</StyledMenuItem>
          <StyledMenuItem value="business">Business</StyledMenuItem>
          <StyledMenuItem value="technology">Technology</StyledMenuItem>
          <StyledMenuItem value="sports">Sports</StyledMenuItem>
          <StyledMenuItem value="health">Health</StyledMenuItem>
        </StyledSelect>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="action" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleInputChange}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

export default NewsHeader;
