<BrowserRouter>
    <Switch>
        <Route path='/' exact={false} component={App} />
        <Route path='/detail' component={Detail} />
        <Route path='/detail/:id' component={DetailA} />
        <Route path='/list' component={List} />
    </Switch>
</BrowserRouter>