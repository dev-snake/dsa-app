interface AdminLayoutProps{
  foo:string
}

const AdminLayout = (props:AdminLayoutProps) => (
  <div className="admin-layout-component">
    {props.foo}
  </div>
);

AdminLayout.defaultProps = {
  foo: 'bar',
};

 export default AdminLayout
