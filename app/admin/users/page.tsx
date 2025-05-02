"use client"

import { useState, useEffect } from "react"
import { Shield, UserPlus, Trash2, Edit, Check, X, LogOut } from "lucide-react"
import { ref, get, set, remove } from "firebase/database"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ProtectedAdminRoute } from "@/components/auth/protected-admin-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loading } from "@/components/loading"
import { database, auth } from "@/lib/firebase"
import { useAuth } from "@/lib/auth"

interface User {
  uid: string
  email: string
  displayName: string | null
  role: "admin" | "user"
  createdAt: string
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [newUserDisplayName, setNewUserDisplayName] = useState("")
  const [newUserRole, setNewUserRole] = useState<"admin" | "user">("user")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const router = useRouter()

  const authContext = useAuth()
  if (!authContext) {
    throw new Error("Auth context is not available.")
  }
  const { signOut } = authContext

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const usersRef = ref(database, "users")
      const snapshot = await get(usersRef)

      if (snapshot.exists()) {
        const usersData = snapshot.val()
        const formattedUsers: User[] = Object.entries(usersData).map(([uid, data]: [string, any]) => ({
          uid,
          email: data.email || "No email",
          displayName: data.displayName || null,
          role: data.role || "user",
          createdAt: data.createdAt || new Date().toISOString(),
        }))

        setUsers(formattedUsers)
      } else {
        setUsers([])
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (uid: string, newRole: "admin" | "user") => {
    try {
      setUpdatingUser(uid)
      setError(null)
      setSuccess(null)

      const userRef = ref(database, `users/${uid}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        await set(userRef, {
          ...userData,
          role: newRole,
        })

        // Update local state
        setUsers(users.map((user) => (user.uid === uid ? { ...user, role: newRole } : user)))

        setSuccess(`User role updated to ${newRole} successfully`)
      } else {
        setError("User not found")
      }
    } catch (err) {
      console.error("Error updating user role:", err)
      setError("Failed to update user role")
    } finally {
      setUpdatingUser(null)
    }
  }

  const handleAddUser = async () => {
    console.log("Add user button clicked")
    try {
      setError(null)
      setSuccess(null)

      if (!newUserEmail || !newUserPassword) {
        setError("Email and password are required")
        return
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
      const user = userCredential.user

      // Update display name if provided
      if (newUserDisplayName) {
        await updateProfile(user, { displayName: newUserDisplayName })
      }

      // Add user to database with role
      const now = new Date().toISOString()
      await set(ref(database, `users/${user.uid}`), {
        email: newUserEmail,
        displayName: newUserDisplayName || null,
        role: newUserRole,
        createdAt: now,
      })

      // Add to local state
      setUsers([
        ...users,
        {
          uid: user.uid,
          email: newUserEmail,
          displayName: newUserDisplayName || null,
          role: newUserRole,
          createdAt: now,
        },
      ])

      // Reset form
      setNewUserEmail("")
      setNewUserPassword("")
      setNewUserDisplayName("")
      setNewUserRole("user")
      setIsAddUserDialogOpen(false)

      setSuccess("User created successfully")
    } catch (err: any) {
      console.error("Error adding user:", err)
      setError(err.message || "Failed to create user")
    }
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return

    try {
      setError(null)
      setSuccess(null)

      const userRef = ref(database, `users/${editingUser.uid}`)
      await set(userRef, {
        email: editingUser.email,
        displayName: editingUser.displayName,
        role: editingUser.role,
        createdAt: editingUser.createdAt,
      })

      // Update local state
      setUsers(users.map((user) => (user.uid === editingUser.uid ? editingUser : user)))

      setEditingUser(null)
      setSuccess("User updated successfully")
    } catch (err) {
      console.error("Error updating user:", err)
      setError("Failed to update user")
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      setError(null)
      setSuccess(null)

      // Delete from database
      await remove(ref(database, `users/${userToDelete.uid}`))

      // Update local state
      setUsers(users.filter((user) => user.uid !== userToDelete.uid))

      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
      setSuccess("User deleted successfully")
    } catch (err) {
      console.error("Error deleting user:", err)
      setError("Failed to delete user")
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="PersonaIQ Admin" width={120} height={32} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-slate-200" onClick={() => router.push("/admin")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" size="sm" className="border-slate-200" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Users Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center" onClick={() => setIsAddUserDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. The user will be able to log in with these credentials.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="displayName" className="text-right">
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      value={newUserDisplayName}
                      onChange={(e) => setNewUserDisplayName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <select
                      id="role"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as "admin" | "user")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loading />
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.uid}>
                          <TableCell>
                            {editingUser?.uid === user.uid ? (
                              <Input
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                className="w-full"
                              />
                            ) : (
                              user.email
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser?.uid === user.uid ? (
                              <Input
                                value={editingUser.displayName || ""}
                                onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                                className="w-full"
                              />
                            ) : (
                              user.displayName || "—"
                            )}
                          </TableCell>
                          <TableCell>
                            {editingUser?.uid === user.uid ? (
                              <select
                                value={editingUser.role}
                                onChange={(e) =>
                                  setEditingUser({ ...editingUser, role: e.target.value as "admin" | "user" })
                                }
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            ) : (
                              <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {editingUser?.uid === user.uid ? (
                                <>
                                  <Button variant="ghost" size="icon" onClick={handleUpdateUser}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => setEditingUser(null)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Dialog
                                    open={isDeleteDialogOpen && userToDelete?.uid === user.uid}
                                    onOpenChange={(open) => {
                                      setIsDeleteDialogOpen(open)
                                      if (!open) setUserToDelete(null)
                                    }}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon" onClick={() => setUserToDelete(user)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Delete User</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to delete this user? This action cannot be undone.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                          Cancel
                                        </Button>
                                        <Button variant="destructive" onClick={handleDeleteUser}>
                                          Delete
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  {user.role === "admin" ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRoleChange(user.uid, "user")}
                                      disabled={updatingUser === user.uid}
                                    >
                                      {updatingUser === user.uid ? "Updating..." : "Make User"}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRoleChange(user.uid, "admin")}
                                      disabled={updatingUser === user.uid}
                                    >
                                      {updatingUser === user.uid ? "Updating..." : "Make Admin"}
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedAdminRoute>
  )
}
