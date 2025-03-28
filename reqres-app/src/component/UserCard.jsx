import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const UserCard = ({ user, onEdit, onDelete }) => {
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={user.avatar} alt={user.first_name} />
      <CardContent>
        <Typography variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
        <Button size="small" color="primary" onClick={() => onEdit(user)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(user.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
