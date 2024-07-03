import 'reflect-metadata';
import { PermissionMetadata } from './PermissionMetadata';

const PERMISSIONS_METADATA_KEY = 'permissions';

export const Permission = (node: string): ClassDecorator => {
  return (target: unknown) => {
    const existingPermissions: PermissionMetadata[] = Reflect.getMetadata(PERMISSIONS_METADATA_KEY, Reflect) || [];
    const permissionMetadata = { node, target };
    Reflect.defineMetadata(PERMISSIONS_METADATA_KEY, [...existingPermissions, permissionMetadata], Reflect);
  };
}

export const getDecoratedPermissions = (): PermissionMetadata[] => {
  return Reflect.getMetadata(PERMISSIONS_METADATA_KEY, Reflect) || [];
}