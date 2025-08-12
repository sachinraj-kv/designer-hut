import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/api/api';
import { Endpoint } from '@/constants/endpoints';

const DialogDemo=()=> {
 

  const [profile, setprofile] = useState({
    name: "",
    email: "",
    role: "",
  });

  

  const [fetch, setfetch] = useState(false);

  useEffect(() => {
    const get_Profile = async () => {
      try {
        const res = await api.get(Endpoint.USER_PROFILE);

        if (res.data.success) {
          
          setprofile((prev) => ({
            name: res.data.fetch_Profile.name,
            email: res.data.fetch_Profile.email,
            role: res.data.fetch_Profile.role,
          }));
          setfetch(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    get_Profile();
  }, [fetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await api.put(Endpoint.USER_PROFILE, {
        name: profile,
      });
      if (res.data.success) {
       
        setfetch(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <img
            src="https://tse1.explicit.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="flag"
            className="h-7 w-7 rounded-full border"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              You can only update your name here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setprofile(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} disabled />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={profile.role} disabled />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo