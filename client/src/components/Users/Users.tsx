import React, { useEffect, useState } from 'react'
import UserTable from '../UserTable/UserTable'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction, changeUserStatusAction, activeAllusersAction, blockAllUsersAction } from '../../store/action/userActions';
import { IUser } from '../../store/types/user.types';
import { Button } from 'react-bootstrap';
import styles from './users.module.scss'
import { createUnparsedSourceFile } from 'typescript';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const {users} = useSelector((state: any) => state.users)


    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])
    

    const [categoryIds, setCategoryIds] = useState<any>([]);

      const handleCategory = (e: any) => {

		const currentCategoryChecked: string = e.target.value;
		const allCategoriesChecked = [...categoryIds];
		const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

		let updatedCategoryIds;
		if (indexFound === -1) {
			// add
			updatedCategoryIds = [...categoryIds, currentCategoryChecked];
			setCategoryIds(updatedCategoryIds);
		} else {
			// remove
			updatedCategoryIds = [...categoryIds];
			updatedCategoryIds.splice(indexFound, 1);
			setCategoryIds(updatedCategoryIds);
		}

        // console.log(categoryIds)
	};

    const blockeSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
        categoryIds?.map((userId: string, index: number) => {
            dispatch(blockAllUsersAction(userId, navigate))
        })
    }

    const activeSelectedUsers = (e: React.MouseEvent<HTMLElement>) => {
            categoryIds?.map((userId: string, index: number) => {
                dispatch(activeAllusersAction(userId, navigate))
            })
    }

    const handleSelectAll = (e: React.MouseEvent<HTMLElement>) => {
        setIsCheckAll(!isCheckAll)
        if(!isCheckAll) {
            users?.map((user: any) => {
                console.log(user._id)
                setCategoryIds((prevVals: any) => [...prevVals, user._id])
            })
        } else {
            setCategoryIds([])
        }
      };

  return (
      <div>
          <div className={styles.actionContainer}>
          <Button 
                variant="light"
                onClick={handleSelectAll}
                >
                SELECT ALL :
            </Button> 

      
            {categoryIds.length > 0 && (
                <>
                
                <div className={styles.actionButtonAll}>
                <Button 
                variant="light"
                onClick={activeSelectedUsers}>
                ACTIVE ALL
            </Button> 
            </div>

            <div className={styles.actionButtonAll}>
                <Button 
                variant="light"
                onClick={blockeSelectedUsers}>
                BLOCK ALL
            </Button> 
            </div>

            </>
            )}
       

        </div>
    <div>
      
        <div>
        <table className="table">
  <thead className="thead-dark">
    <tr>
    <th scope="col">Lp.</th>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Last Login</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>

  </thead>
 
   
    {users?.map((user: any, index: number) => (
         <tbody  key={index}>
        <tr>
        <th scope="row">{index+1}
        <input
            className='form-check-input'
            type='checkbox'
            name='category'
            value={user._id}
            id='flexCheckChecked'
            checked={categoryIds.includes(user._id)}
            onChange={handleCategory}
            />
        </th> 
        <UserTable user={user}  lp={index + 1}/>
        </tr>
        </tbody>
    ))}
  
</table>

    </div>
    </div>

    </div>
  )
}

export default Users